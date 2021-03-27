defmodule EventspaWeb.Router do
  use EventspaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", EventspaWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api/v1", EventspaWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/events", EventController, except: [:new, :edit]
    resources "/comments", CommentController, except: [:new, :edit]
    resources "/invites", InviteController, except: [:new, :edit]
    resources "/session", SessionController, only: [:create]
  end

  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: EventspaWeb.Telemetry
    end
  end
end
