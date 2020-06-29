from apps.user.models import User
from apps.account.models import Account, AccountMember


class CreateUserAPITestCaseMixin:
    def create_user_and_login(self):
        user = User.objects.create_user("foo@bar.com", password="foo")
        self.client.login(username=user.email, password="foo")

        return user


class CreateAccountAPITestCaseMixin:
    def create_account_and_login(self):
        user = User.objects.create_user("foo@bar.com", password="foo")
        account = Account.objects.create(name="Foo")

        AccountMember.objects.create(user=user, account=account)

        self.client.login(username=user.email, password="foo")

        return user, account
