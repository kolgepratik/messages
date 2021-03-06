(
	function( $ ) {
		var settings = {			
			messages: {	
				constants: {					
				},
				defaults: {
					messageStyle: 'ms-msg-block'
				}								
			}
		};
		
		var methods = {
			
			init: function(options) {
				$.extend(settings.messages.defaults, options);
			},
			
			add: function(options) {
				options = $.extend({}, options);
				
				return this.each(function() {
					var $this = $(this);
					
					var $message = helpers.messages.getMessage(options);
					
					helpers.messages.remove($this, options);
					
					if(options.where) {
						if(options.where === 'before') {
							$this.before($message);
						} else if(options.where === 'after') {
							$this.after($message);
						} else if(options.where === 'append') {
							$this.append($message);
						} else if(options.where === 'prepend') {
							$this.prepend($message);
						}
					} else {
						$this.after($message);
					}
					
					if(options.flash) {
						$this.effect('highlight', options.flash);
					}
					
					if(options.autoHide) {
						setTimeout(function() {
							$message.remove();
						}, options.autoHide);
					}
				});
			},
			
			remove: function(options) {
				options = $.extend({}, options);
				
				return this.each(function() {
					var $this = $(this);
					
					helpers.messages.remove($this, options);
				});
			},
			
			update: function(options) {
				options = $.extend({}, options);
				
				return this.each(function() {
					var $this = $(this);
					
					helpers.messages.findMessage($this, options).html(options.text);
				
					if(options.flash) {
						$this.effect('highlight', options.flash);
					}
				});
			}
		};
		
		var helpers = {
			messages: {
				getMessage: function(options) {
					var $messageSpan = $('<span></span>');
			
					$messageSpan.append(options.text);			
					$messageSpan.addClass('ms-msg ms-msg-' + options.type + ' ms-msg-' + options.id + ' ' + settings.messages.defaults.messageStyle);
					
					return $messageSpan;
				},
				
				getMessageParent: function(element, options) {
					var messageParent = null;
					
					if(options.where) {
						if(options.where === 'before' || options.where === 'after') {
							messageParent = element.parent();
						} else if(options.where === 'append' || options.where === 'prepend') {
							messageParent = element;
						}
					} else {
						messageParent = element.parent();
					}
					
					return messageParent;
				},
				
				findMessage: function(element, options) {
					var message = null;
					
					if(options.id) {
						message = helpers.messages.getMessageParent(element, options).find('span.ms-msg-' + options.id);						
					} else if (options.type) {
						message = helpers.messages.getMessageParent(element, options).find('span.ms-msg-' + options.type);						
					} else {
						message = helpers.messages.getMessageParent(element, options).find('span.ms-msg');						
					}
					
					return message;
				},
				
				remove: function(element, options) {
					helpers.messages.findMessage(element, options).remove();
				}
			}
		};
		
		$.fn.messages = function( method ) {
			// If the method parameter is present, then call the method, else call the default method i.e. init. 
			if( methods[method] ) {
				return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			} else if ( !method || typeof method === 'object' ) {
				return methods.init.apply(this, arguments);
			} else {
				$.error('Method ' + method + ' does not exist on jQuery.messages');
			}
		}; 
	}
) (jQuery) ;