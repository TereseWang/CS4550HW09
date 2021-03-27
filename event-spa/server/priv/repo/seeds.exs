# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Eventspa.Repo.insert!(%Eventspa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Eventspa.Repo
alias Eventspa.Users.User
alias Eventspa.Events.Event

defmodule Inject do
  def user(email, name, pass) do
    hash = Argon2.hash_pwd_salt(pass)
    Repo.insert!(%User{email: email, name: name, password_hash: hash})
  end
end

alice = Inject.user("teresewang2000@gmail.com", "Terese", "test1")
bob = Inject.user("wang@gmail.com", "Bob", "test2")

e1 = %Event{
  name: "Alice Birthday Party",
  date: ~N[2000-01-01 23:00:07],
  description: "There will be pizza",
  user_id: alice.id
}

Repo.insert!(e1)

e2 = %Event{
  name: "Bob Birthday Party",
  date: ~N[2000-01-01 23:00:07],
  description: "There will be pizza",
  user_id: bob.id
}

Repo.insert!(e2)
