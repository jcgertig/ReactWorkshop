class AddUuidAndTokenAndTokenCreatedToUser < ActiveRecord::Migration
  def change
    add_column :users, :uuid, :string
    add_column :users, :token, :text
    add_column :users, :token_created, :datetime
  end
end
