class Todo < ApplicationRecord
  validates :to, presence: true, length: { maximum: 10 }
  validates :do, presence: true, length: { maximum: 30 }
end
