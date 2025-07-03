from django.shortcuts import render, get_object_or_404, redirect
from .models import Product, Category, Order, OrderItem
from decimal import Decimal
from django.conf import settings
from django.views.decorators.http import require_POST
from .forms import OrderCreateForm
from django.core.mail import send_mail
from django.http import JsonResponse


# Create your views here.
def product_list(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    products = Product.objects.filter(available=True)

    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=category)

    return render(request, "pages/product_list.html", {
        "category": category,
        "categories": categories,
        "products": products,
    })


def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug, available=True)
    return render(request, "pages/product_detail.html", {"product": product})


class Cart:
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart

    def add(self, product, quantity=1, update_quantity=False):
        product_id = str(product.id)
        if product_id not in self.cart:
            self.cart[product_id] = {
                "quantity": 0,
                "price": str(product.price)
            }

        if update_quantity:
            self.cart[product_id]["quantity"] = quantity  # reset
        else:
            self.cart[product_id]["quantity"] += quantity  # accumulate
        self.save()

    def save(self):
        self.session.modified = True

    def remove(self, product):
        product_id = str(product.id)
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()

    def __iter__(self):
        product_ids = self.cart.keys()
        products = Product.objects.filter(id__in=product_ids)
        cart = self.cart.copy()

        for product in products:
            cart[str(product.id)]['product'] = product

        for item in cart.values():
            item['price'] = Decimal(item['price'])
            item['total_price'] = item['price'] * item['quantity']
            yield item

    def __len__(self):
        return sum(item['quantity'] for item in self.cart.values())

    def get_total_price(self):
        return sum(Decimal(item['price']) * item['quantity'] for item in self.cart.values())

    def clear(self):
        del self.session[settings.CART_SESSION_ID]
        self.save()

    def update(self, product_id, quantity):
        product_id = str(product_id)
        if product_id in self.cart:
            self.cart[product_id]["quantity"] = quantity
            self.save()


def cart_add(request, product_id):
    cart = Cart(request)
    product = get_object_or_404(Product, id=product_id)
    # cart.add(product=product)
    cart.add(product=product, quantity=1, update_quantity=True)
    return redirect("apps.products:cart_detail")


def cart_remove(request, product_id):
    cart = Cart(request)
    product = get_object_or_404(Product, id=product_id)
    cart.remove(product)
    return redirect("apps.products:cart_detail")


@require_POST
def cart_update(request, product_id):
    cart = Cart(request)
    quantity = request.POST.get("quantity")

    try:
        quantity = int(quantity)
        if quantity > 0:
            cart.update(product_id, quantity)
        else:
            cart.remove(product_id)
    except (ValueError, TypeError):
        pass  # You might show a message later

    return redirect("apps.products:cart_detail")


def cart_detail(request):
    cart = Cart(request)
    return render(request, "pages/cart_detail.html", {"cart": cart})


def order_create(request):
    cart = Cart(request)
    if request.method == 'POST':
        form = OrderCreateForm(request.POST)
        if form.is_valid():
            order = form.save(commit=False)
            order.user = request.user
            order.save()
            for item in cart:
                OrderItem.objects.create(
                    order=order,
                    product=item['product'],
                    price=item['price'],
                    quantity=item['quantity']
                )
            cart.clear()

            # Send confirmation email
            subject = f"Order Confirmation - Order #{order.id}"
            message = (
                f"Hi {order.first_name},\n\n"
                f"Thank you for your order!\n\n"
                f"Order ID: {order.id}\n"
                f"Total: {order.get_total_cost()} KES\n\n"
                f"We will contact you once your order is processed.\n\n"
                f"Best regards,\n"
                f"Blue Square Aviation Technologies"
            )
            recipient_list = [order.email]
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list)
            
            # Redirect or show confirmation
            return render(request, 'pages/order_created.html', {'order': order})
    else:
        form = OrderCreateForm()
    return render(request, 'pages/order_create.html', {'cart': cart, 'form': form})


def cart_count(request):
    cart = Cart(request)
    return JsonResponse({'cart_count': cart.count()})
