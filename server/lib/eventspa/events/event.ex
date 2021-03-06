defmodule Eventspa.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field :date, :naive_datetime
    field :description, :string
    field :name, :string
    belongs_to :user, Eventspa.Users.User
    has_many :comments, Eventspa.Comments.Comment, on_delete: :delete_all
    has_many :invites, Eventspa.Invites.Invite, on_delete: :delete_all
    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:name, :date, :description, :user_id])
    |> validate_required([:name, :date, :description, :user_id])
  end
end
