from django.contrib import admin
from .models import Category, Product, Order, OrderItem


# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}
    list_display = ("id", "name", "slug")


class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "available")
    list_filter = ("available", "category")
    prepopulated_fields = {"slug": ("name",)}


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['product']
    extra = 0


class OrderAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email", "address",
                    "city", "postal_code", "paid", "created_at", "user")
    list_filter = ("user", "created_at", "paid")
    search_fields = ['first_name', 'last_name', 'email']
    inlines = [OrderItemInline]

    # Optional: Makes readonly fields
    readonly_fields = ['created_at']


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order", "product", "price", "quantity")
    list_filter = ("product",)


admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
