class ApplicationController < ActionController::Base

	helper_method :current_user

	def current_user
		return @current_user if @current_user.present?

		if session[:user_id].present?
			@current_user = User.find(session[:user_id])
		else
			username = "guest" + User.count.to_s
			@current_user = User.create(username: username)
			session[:user_id] = @current_user.id
			return @current_user
		end
	end
end
