# Serialization

*serializers.ModelSerializer*

The ModelSerializer class provides a shortcut that lets you automatically create a Serializer class with fields that correspond to the Model fields.

The ModelSerializer class is the same as a regular Serializer class, except that:

- It will automatically generate a set of fields for you, based on the model.
- It will automatically generate validators for the serializer, such as unique_together validators.
- It includes simple default implementations of .create() and .update().

```python
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'account_name', 'users', 'created')
```



*serializers.HyperlinkedModelSerializer*

The HyperlinkedModelSerializer class is similar to the ModelSerializer class except that it uses *hyperlinks* to represent relationships, rather than primary keys.


*viewsets.ModelViewSet*

A ViewSet class is simply a type of class-based View, that does not provide any method handlers such as .get() or .post(), and instead provides actions such as .list() and .create().

An example to get all users in the database.

```python
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from myapps.serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.response import Response

class UserViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    def list(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
```

# Requests and Response

*Request objects* - extends `HttpRequest`

```python
request.POST # Only handles form data. Only works for POST method
request.data # Handles arbitrary data. Wors for 'POST', 'PUT' and 'PATCH' methods
```

*Response objects* extends TemplateResponse takes unrendered content and uses content negotiation to determine the correct content type to return to the client.

`@api_view(['GET', 'POST'])`

# Class-based Views

`APIView`

```python
class SnippetList(APIView):
	"""
	List all snippets, or create a new snippet.
	"""
	def get(self, request, format=None):
		snippets = Snippet.objects.all()
		serializer = SnippetSerializer(snippets, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		serializer = SnippetSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SnippetDetail(APIView):
	"""
	Retrieve, update or delete a snippet instance
	"""
	def get_object(self, pk):
		try:
			return Snippet.objects.get(pk=pk)
		except Snippet.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		snippet = self.get_object(pk)
		serializer = SnippetSerializer(snippet)
		return Response(serializer.data)

	def put(slef, request, pk, format=None):
		snippet = self.get_object(pk)
		serializer = SnippetSerializer(snppet, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, pk, format=None):
		snippet = self.get_object(pk)
		snippet.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
```

**Using Mixins**

ListModelMixin, CreateModelMixin etc.

```python
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework import mixins
from rest_framework import generics

class SnippetList(mixins.ListModelMixin,
				 mixins.CreateModelMixin,
				  generics.GenericAPIView):
	queryset = Snippet.objects.all()
	serializer_class = SnippetSerializer

	def get(self, request, *args, **kwargs):
		return self.list(request, *args, **kwargs)

	def post(self, request, *args, **kwargs):
		return self.create(request, *args, **kwargs)

class SnippetDetail(mixins.RetrieveModelMixin,
				 	mixins.UpdateModelMixin,
				 	mixins.DestroyModelMixin,
				  	generics.GenericAPIView):
	queryset = Snippet.objects.all()
	serializer_class = SnippetSerializer

	def get(self, request, *args, **kwargs):
		return self.retrieve(request, *args, **kwargs)

	def put(self, request, *args, **kwargs):
		return self.update(request, *args, **kwargs)

	def delete(self, request, *args, **kwargs):
		return self.destroy(request, *args, **kwargs)
```

# Authentication & Permissions

- Make a relation between snipppets model and users

Question: `serializer.save` why does the serializer has a save method? Probably because of it being `ModelSerializer`.

`from rest_framework import permissions`

# Relationships & Hyperlinked APIs

`HyperlinkedModelSerializer` has the following diff from `ModelSerializer`
- It does not include the id field by default
- it includes a url field, using HyperlinkedIdentityField
- Relationships use HyperlinkedRelatedField instead of PrimaryRelatedField




