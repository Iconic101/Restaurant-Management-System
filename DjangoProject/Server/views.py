from django.db.migrations import serializer
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from django.contrib.auth.models import User, auth
from .serializers import *
from django.contrib import messages
from django.contrib.auth.hashers import make_password

class ItemList(APIView):
    def get(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)



        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Create your views here.
class Register(APIView):
    # def get(self, request):
    #     users = User.objects.all()
    #     serializer = UserSerializer(users, many=True)
    #     return Response(serializer.data)

    def post(self, request):

        if request.method == "POST":


            name = request.data['name']
            password = request.data['password']
            email = request.data['email']

            if User.objects.filter(email=email).exists():
                messages.info(request, "Email already registered")
                return Response("email in use")

            elif User.objects.filter(username=name).exists():

                messages.info(request, "Username already in use!")
                return redirect("register")

            else:
                hashed_password = make_password(password)
                user = User.objects.create(email=email, username=name, password=hashed_password)
                user.save()
                return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)



        # serializer = UserSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        #
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Login(APIView):
    def post(self, request):
        username = request.data['name']
        password = request.data['password']
        user = auth.authenticate(username=username, password=password)


        if user is not None:

            return Response({"message": "Login Successful"})
        else:
            messages.info(request, "Username or password is incorrect")
            return Response({"message": "Username or password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

class LogoutVIew(APIView):
    def post(self, request):
        auth.logout(request)
        return Response({"message": "Logout Successful"})



class OrderView(APIView):
    def get(self, request):

        if bool(len(request.query_params.keys())):
            query = dict(request.query_params)
            id = int(list(query.values())[0][0])
            order = Order.objects.get(id=id)

            serializer = OrderSerializer(order)

            return Response(serializer.data)


        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


    def post(self, request):
        if request.method == "POST":
            serializers = OrderSerializer(data=request.data)
            if serializers.is_valid():
                serializers.save()
                return Response(serializers.data, status=status.HTTP_201_CREATED)
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        if request.method == "PATCH":
            order_id = request.data['id']


            order = Order.objects.get(id=order_id)
            serializer = OrderSerializer(order, data=request.data['change'], partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        if request.method == "DELETE":

            order_id = request.query_params.get('id')
            order = Order.objects.get(id=order_id)
            order.delete()
            return Response({"message": "delete successful"},status=status.HTTP_204_NO_CONTENT)



class TableView(APIView):
    def get(self, request):

        if bool(len(request.query_params.keys())):
            query = dict(request.query_params)
            id = int(list(query.values())[0][0])
            table = Table.objects.get(id=id)
            serializer = TableSerializer(table)

            return Response(serializer.data)

        tables = Table.objects.all()
        serializer = TableSerializer(tables, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




    def patch(self, request):
        if request.method == "PATCH":
            table_id = request.data['id']
            table = Table.objects.get(id=table_id)
            serializer = TableSerializer(table, data=request.data['data'], partial=True)

            if serializer.is_valid():
                serializer.save()
                tables = Table.objects.all()
                serializer = TableSerializer(tables, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)


            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





