from django.contrib.postgres.fields import ArrayField
from django.db import models

class Order(models.Model):
    table_number = models.IntegerField()
    people =models.IntegerField()
    ordered_items = ArrayField(
        models.IntegerField(),  # Define the type of items in the array
        # Optional: max number of items in the array
        blank=True,
        default=list
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_settled = models.BooleanField(default=False)
    bill_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    server_name = models.CharField(max_length=100)
    tip = models.DecimalField(max_digits=10, decimal_places=2, default=0)



    def __str__(self):
        return self.server_name

class Item(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=100, default='item')


    def __str__(self):
        return self.name




class Table(models.Model):
    has_customer = models.BooleanField(default=False)
    table_number = models.IntegerField()
    order_id = models.IntegerField(default=-1)

    def __str__(self):
        return str(self.table_number)




