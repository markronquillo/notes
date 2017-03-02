Reference models

```python
class Item(Model):
    order
    product
    quantity
    unit_price
```

### Basics

These returns querysets
- all
- filter
- exclue
- order_by
- reverse
- distinct
- annotate


These returns other values
- get
- first
- last
- lastest
- earliest
- exists
- count
- aggregate

```python
# annotate vs aggregate

products = products.annotate(Count('item'))
products.first().item__count

grand_total = orders.aggregate(Sum('total'))
grand_total['total__sum']
```

### Not so basic
- select_related
- prefetch_related
- defer
- only
- using
- values
- values_list
- in_bulk
- bulk_create

```python
product = Product.objects.get(...)
print(product.seller.id) # extra DB query - when we access the related table

product = Product.objects.select_related('seller').get(...) # automatically join


# faster when accessing 'name' and 'price'
product = Product.objects.only('name', 'price').get(...)

# faster when accessing all fields except 'expensive_field'
product = Product.objects.defer('expensive_field').get(...)

# in_bulk: you pass a list of ids and will return a dictionary mapping
# of the id and the object
products = Product.objects.in_bulk([1, 2])
# {1: <Product: ...> 2: <Product: ...>}

# filter items by month ordered
items = item.objects.filter(order__ordered_at__month=...)

# list product Ids
product_ids item.values_list('product_id', flat=True).distinct()

# query for products
products = Product.objects.in_bulk(product_ids)

```

