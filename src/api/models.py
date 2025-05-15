from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime

db = SQLAlchemy()


class Favorite(db.Model):
    __tablename__ = "favorites"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        db.ForeignKey("users.id"), nullable=False)
    animal_id: Mapped[int] = mapped_column(
        db.ForeignKey("animals.id"), nullable=False)

    # user relationship
    user = db.relationship("User", back_populates="favorites")
    animal = db.relationship("Animal", back_populates="favorites")


class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(120), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    salt: Mapped[str] = mapped_column(String(500), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    start_date: Mapped[datetime] = mapped_column(default=datetime.utcnow)

    # Favorite relationship
    favorites = db.relationship(
        "Favorite", back_populates="user", cascade="all, delete-orphan")

    def __init__(self, email, password, salt, phone, start_date):
        self.email = email
        self.password_hash = password
        self.salt = salt
        self.phone = phone
        self.is_active = True
        self.start_date= start_date

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "is_active": self.is_active,
            "phone": self.phone,
            "email": self.email,
        }


class Animal(db.Model):
    __tablename__ = "animals"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    age: Mapped[int] = mapped_column(nullable=False)
    animal_type: Mapped[str] = mapped_column(String(50), nullable=False)
    race: Mapped[str] = mapped_column(String(50), nullable=False)
    photo: Mapped[str] = mapped_column(String(500),)
    color: Mapped[str] = mapped_column(String(50), nullable=False)
    vaccines: Mapped[str] = mapped_column(String(500), nullable=True)

    favorites = db.relationship("Favorite", back_populates="animal")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "age": self.age,
            "animal_type": self.animal_type,
            "race": self.race,
            "photo": self.photo,
            "color": self.color,
            "vaccines": self.vaccines,
        }
