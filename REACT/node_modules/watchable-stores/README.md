# watchable-stores

Data model with observer / observable pattern for front-end purpose.

The lib is very easy to use :

![dashboard view](https://github.com/Vashnak/watchable-stores/blob/master/screenshots/Screenshot_UsersStore.png)

We can define an interface to represent the data stored in the Store (here: IUserData).

Then, we create our store, by instanciating a new class extending WatchableStore. In the constructor, we have to invoke the super method, it will pass the content as initial data to our store.

WatchableStore provides us 2 methods :
 - watch(cb: (data: IUserData) => any): number;
 - unwatch(id: number): void;

Here are how we can use it.

![dashboard view](https://github.com/Vashnak/watchable-stores/blob/master/screenshots/Screenshot_UserCreationForm.png)
![dashboard view](https://github.com/Vashnak/watchable-stores/blob/master/screenshots/Screenshot_UserList.png)

Our first class is a React class that just render a text input. The second one displays the list of users.

In the first one, when we click on the "Add user" button, it will trigger the function addUser of our store. By doing this, all the components listening our store will be notified that the data has been updated.
It means that our second class "UserList" will be able to manage the new users.


### /!\ Do not forget to unwatch the store when you destroy your component.
