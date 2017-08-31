module Concerns::Board::Validation
  extend ActiveSupport::Concern

  included do
    validates :title, presence: true
  end
end
