class CreateTodos < ActiveRecord::Migration[7.1]
  def change
    create_table :todos do |t|
      t.string :to, null: false
      t.text :do, null: false

      t.timestamps
    end
  end
end
