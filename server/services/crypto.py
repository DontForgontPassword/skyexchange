import hashlib
import bcrypt

def hash_password(password: str) -> str:
    sha = hashlib.sha256(password.encode()).digest()
    return bcrypt.hashpw(sha, bcrypt.gensalt()).decode()


def verify_password(password: str, hashed: str) -> bool:
    sha = hashlib.sha256(password.encode()).digest()
    return bcrypt.checkpw(sha, hashed.encode())