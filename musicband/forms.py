from allauth.account.forms import LoginForm
from django import forms


class MyLoginForm(LoginForm):
    """Сделал полям логина и пороля классы бутстрапа"""

    def __init__(self, *args, **kwargs):
        super(MyLoginForm, self).__init__(*args, *kwargs)
        self.fields['login'].widget.attrs.update({'class': 'form-control'})
        self.fields['password'].widget.attrs.update({'class': 'form-control'})
        self.fields['remember'].widget.attrs.update({'class': 'custom-control-input'})
