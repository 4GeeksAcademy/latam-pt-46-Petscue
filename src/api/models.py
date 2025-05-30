from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, Enum
from sqlalchemy.orm import Mapped, mapped_column
import enum
from sqlalchemy import DateTime
from datetime import datetime
from sqlalchemy import Enum as PgEnum


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


class UserRole(enum.Enum):
    ADMIN = "ADMIN"
    ADOPTER = "ADOPTER"
    RESCUER = "RESCUER"
    OWNER = "OWNER"


class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(120), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    story: Mapped[str] = mapped_column(String(1000), nullable=False)
    profile_picture: Mapped[str] = mapped_column(String(500), nullable=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(nullable=False)
    salt: Mapped[str] = mapped_column(String(500), nullable=False)
    is_active: Mapped[bool] = mapped_column(
        Boolean(), nullable=False, default=True)
    start_date: Mapped[datetime] = mapped_column(default=datetime.utcnow)

    # rol de usuario
    role: Mapped[UserRole] = mapped_column(
        PgEnum(UserRole, name="userrole", create_constraint=False), nullable=False)

    # Favorite relationship
    favorites: Mapped[list["Favorite"]] = db.relationship(
        "Favorite", back_populates="user", cascade="all, delete-orphan")

    # relacion de animalitos publicados con el publicador
    animals_added: Mapped[list["Animal"]] = db.relationship(
        back_populates="added_by", cascade="all, delete-orphan")

    def __init__(self, email, password_hash, salt, phone, story, profile_picture, role, start_date, first_name, last_name, is_active):
        self.email = email
        self.password_hash = password_hash
        self.salt = salt
        self.phone = phone
        self.story = story
        self.profile_picture = profile_picture
        self.role = role
        self.start_date = start_date
        self.first_name = first_name
        self.last_name = last_name
        self.is_active = is_active

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "is_active": self.is_active,
            "phone": self.phone,
            "story": self.story,
            "profile_picture": self.profile_picture,
            "email": self.email,
            "role": self.role.value,
            "start_date": self.start_date.isoformat() if self.start_date else None,
        }


class Animal(db.Model):
    __tablename__ = "animals"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    age: Mapped[int] = mapped_column(nullable=False)
    animal_type: Mapped[str] = mapped_column(String(50), nullable=False)
    race: Mapped[str] = mapped_column(String(50), nullable=False)
    photo: Mapped[str] = mapped_column(String(500),)
    description: Mapped[str] = mapped_column(String(1000), nullable=False)
    color: Mapped[str] = mapped_column(String(50), nullable=False)
    vaccines: Mapped[str] = mapped_column(String(500), nullable=True)

    favorites = db.relationship("Favorite", back_populates="animal")

    # para relacionar animalitos con el usuario publicador
    added_by_id: Mapped[int] = mapped_column(
        db.ForeignKey("users.id"), nullable=False)
    added_by: Mapped["User"] = db.relationship(back_populates="animals_added")

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
            "description": self.description,
            "added_by_id": self.added_by_id,  # id of the user who uploaded the animal
        }
