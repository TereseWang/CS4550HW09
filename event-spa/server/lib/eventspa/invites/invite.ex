defmodule Eventspa.Invites.Invite do
  use Ecto.Schema
  import Ecto.Changeset

  schema "invites" do
    field :email, :string
    field :response, :string
    belongs_to :user, Eventspa.Users.User
    belongs_to :event, Eventspa.Events.Event
    timestamps()
  end

  @doc false
  def changeset(invite, attrs) do
    invite
    |> cast(attrs, [:email, :response, :user_id, :event_id])
    |> validate_required([:email, :response, :user_id, :event_id])
  end
end
