defmodule Eventspa.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    has_many :events, Eventspa.Events.Event
    has_many :comments, Eventspa.Comments.Comment
    has_many :invites, Eventspa.Invites.Invite

    timestamps()
  end

  @doc false
 def changeset(user, attrs) do
   attrs = if attrs["password"] != "" do
     Map.put(attrs, "password_hash", Argon2.hash_pwd_salt(attrs["password"]))
   else
     attrs
   end

   user
   |> cast(attrs, [:name, :email, :password_hash])
   |> validate_required([:name, :email, :password_hash])
 end
end
