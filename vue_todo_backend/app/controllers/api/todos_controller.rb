class Api::TodosController < ApplicationController

  def index
    @todos = Todo.all.reverse

    render json: @todos
  end

  def create
    todo = Todo.new(post_params)
    if todo.save
      render json: todo
    else
      render json: { errors: todo.errors.messages }
    end
  end

  private

  def post_params
    params.require(:todo).permit(:to, :do)
  end
end
