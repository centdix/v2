class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :player1_points
      t.integer :player2_points

      t.timestamps
    end
  end
end
