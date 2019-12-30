from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login as auth_login
from .models import MyContact
from .forms import NewContactForm
from django.http import Http404, HttpResponseRedirect
# Create your views here.


@login_required(login_url='login')
def ContactView(request):
    if request.user.is_superuser:
        members = MyContact.objects.all()
    else:
        members = MyContact.objects.filter(user=request.user)
    return render(request, 'home.html', {'members': members})


@login_required(login_url='login')
def create_Contact(request):
    if request.method == 'POST':
        form = NewContactForm(request.POST or None)
        if form.is_valid():
            members = form.save(commit=False)
            members.user = request.user
            members.save()
            return redirect('home')
    else:
        form = NewContactForm()
    return render(request, 'create.html', {'form': form})


# @login_required(login_url='login')
# def PersonView(request,pk):
#     person=request.user.mycontacts.get(pk=pk)
#     return render(request,'person.html',{'person':person})


@login_required(login_url='login')
def contact_edit(request, pk):
    if request.user.is_superuser:
        members = get_object_or_404(MyContact, pk=pk)
    else:
        members = get_object_or_404(MyContact, pk=pk, user=request.user)

    form = NewContactForm(request.POST or None, instance=members)

    if form.is_valid():
        form.save()
        return redirect('home')
    else:
        return render(request, 'edit.html', {'form': form})


@login_required(login_url='login')
def contact_delete(request, pk):
    if request.user.is_superuser:
        members = get_object_or_404(MyContact, pk=pk)
    else:
        members = get_object_or_404(MyContact, pk=pk, user=request.user)
    if request.method == "POST":
        members.delete()
        return redirect('home')
    return render(request, 'delete.html', {'object': members})
