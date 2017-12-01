from django.shortcuts import render

# Create your views here

from django.http import HttpResponse

def index(request):
	return HttpResponse("Welcome to RNAHub!")
def tables(request):
	samples = Sample.objects.all()
	return render(request, 'list.html', locals())
