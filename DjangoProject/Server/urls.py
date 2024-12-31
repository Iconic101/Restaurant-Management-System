from django.urls import path
from .views import *

urlpatterns = [
    path('items/', ItemList.as_view(), name='item-list'),
    path('register/',Register.as_view(), name='register'),
    path('login/',Login.as_view(), name='login'),

    path('Order/',OrderView.as_view(), name='make-order'),
    path('Tables/', TableView.as_view(), name='tables'),
]
