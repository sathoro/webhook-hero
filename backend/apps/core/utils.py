from uuid import UUID


def is_valid_uuid(uuid_str):
    try:
        UUID(uuid_str, version=4)
    except (TypeError, ValueError):
        return False

    return True
