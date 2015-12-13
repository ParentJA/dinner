__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Local imports...
from .models import UserRecipeRecord


def get_current_user_recipe_record(user, recipe):
    """
    Retrieves the record for a given recipe that is currently being made be a given user. When a user starts making a
    recipe, a record is automatically created. When the user finishes making the recipe, the record is updated. If no
    record is currently open, this method returns None.
    :param user: the specified user
    :param recipe: the specified recipe
    :return: a record (or None)
    """
    try:
        return UserRecipeRecord.objects.get(user=user, recipe=recipe, updated__isnull=True)
    except UserRecipeRecord.DoesNotExist:
        return None
