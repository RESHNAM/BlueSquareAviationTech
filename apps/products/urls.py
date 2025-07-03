from django.urls import path
from . import views

urlpatterns = [
    path("", views.product_list, name="product_list"),
    path(
        "<slug:category_slug>/",
        views.product_list,
        name="product_list_by_category"
    ),
    path("shop/<slug:slug>/", views.product_detail, name="product_detail"),
    path("cart", views.cart_detail, name="cart_detail"),
    path("add/<int:product_id>/", views.cart_add, name="cart_add"),
    path("remove/<int:product_id>/", views.cart_remove, name="cart_remove"),
    path("update/<int:product_id>/", views.cart_update, name="cart_update"),
    path('checkout', views.order_create, name='order_create'),
    path("cart/count", views.cart_count, name="cart_count"),
]
