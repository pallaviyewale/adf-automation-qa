// spec.js

describe('ADF Demo App', function() {

	let EC = ExpectedConditions;
	let condition;
	
	it('should login to ADF', function() 
	{	
		browser.get('http://qaexercise.envalfresco.com/');
		browser.manage().window().maximize();
		
	    expect(browser.getTitle()).toEqual("Welcome - Alfresco ADF Application");
	    
		var userName = element(by.id("username"));
		userName.sendKeys("guest@example.com");
		var password = element(by.id("password"));
		password.sendKeys("Password");
		var loginButton = element(by.buttonText("SIGN IN"));
		loginButton.click();
		
		condition = EC.titleContains("Welcome - Alfresco ADF Application");
		browser.wait(condition, 30000);
		expect(browser.getTitle()).toEqual("Welcome - Alfresco ADF Application");
		
		console.log( "Successfully logged in to ADF App");
	});
	
	it('should create a new folder', function() 
	{
		element(by.xpath("//span[text()='Content Services']")).click();
		
		browser.sleep(1000)
		var foldernames = element(by.xpath("//span[@title='magemello']"));
		foldernames.isPresent().then(function(isPresent)
		{
			if(isPresent)
			{
				console.log( "Folder Already Exists " + isPresent);

			}
			else
			{
				element(by.xpath("//button[@data-automation-id ='create-new-folder']")).click();

				condition = EC.presenceOf(element(by.id("adf-folder-name-input")));
				browser.wait(condition, 3000);
				element(by.id("adf-folder-name-input")).sendKeys("magemello");
				element(by.id("adf-folder-create-button")).click();
			
				condition = EC.presenceOf(element(by.xpath("//span[@title='magemello']")));
				browser.wait(condition, 3000);
				var expectedFolderName = element(by.xpath("//span[@title='magemello']"));
				expect(expectedFolderName.getText()).toEqual('magemello');
				
				console.log( "New Folder created");
			}
		});
	
	});
  
	it('should not allow to create a new folder with same name', function() 
	{
		element(by.xpath("//span[text()='Content Services']")).click();
		element(by.xpath("//button[@data-automation-id='create-new-folder']")).click();

		condition = EC.presenceOf(element(by.id("adf-folder-name-input")));
		browser.wait(condition, 3000);
		element(by.id("adf-folder-name-input")).sendKeys("magemello");
		element(by.id("adf-folder-create-button")).click();
			
		var expectedMessage = element(by.xpath("//span[contains(text(),'already a folder with this name.')]"));
		expect(expectedMessage.getText()).toEqual("There's already a folder with this name. Try a different name.");
		
		element(by.id("adf-folder-cancel-button")).click();
		
		console.log( "There's already a folder with this name. Try a different name.");
	});

	it('should allow you to delete the folder', function() 
	{
		element(by.xpath("//span[@title='magemello']")).click();
		
		condition = EC.elementToBeClickable(element(by.xpath("//span[@title='magemello']/../../../../..//button[@title='Content actions']")));
		browser.wait(condition, 3000);
		element(by.xpath("//span[@title='magemello']/../../../../..//button[@title='Content actions']")).click();

		condition = EC.elementToBeClickable(element(by.xpath("//span[text()='Delete']")));
		browser.wait(condition, 3000);
		element(by.xpath("//span[text()='Delete']")).click();
		
		browser.sleep(1000);		
		var foldernames = element(by.xpath("//span[@title='magemello']"));
		expect(foldernames.isPresent()).toBe(false);
		
		console.log( "Folder deleted");
	});
	

});
