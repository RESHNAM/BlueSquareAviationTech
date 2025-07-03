from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm
from django.contrib import messages


# Create your views here.
def register_view(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Account User created successfully. You can now log in.")
            return redirect('login')  # Redirect to login after registration
    else:
        form = CustomUserCreationForm()
    return render(request, "auth/register.html", {"form": form})
