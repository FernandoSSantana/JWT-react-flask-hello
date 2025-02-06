const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
			],
			registerUser: [],
			authToken: null,
			user: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			registerUser: async (formData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/create", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(formData)
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.message); // Lanza el mensaje del backend
					}

					const data = await response.json();
					return true; // Registro exitoso
				} catch (error) {
					console.error("Error al registrar el usuario:", error.message);
					throw error; // Lanza el error al componente
				}
			},
			

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			loginUser: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password })
					});

					if (response.ok) {
						const data = await response.json();
						setStore({ authToken: data.access_token, user: data.user });
						localStorage.setItem("authToken", data.access_token); // Guarda el token en el almacenamiento local
						localStorage.setItem("user", JSON.stringify(data.user)); // Guarda los datos del usuario
						console.log("Login successful!", data);
						return true; // Indica éxito en el inicio de sesión 
					} else {
						console.log("Login failed!");
						return false; // Indica fracaso en el inicio de sesión 
					}
				} catch (error) {
					console.error("Error logging in", error);
					return false;
				}
			}
		}
	};
};

export default getState;
