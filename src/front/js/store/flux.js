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
			token: localStorage.getItem("authToken") || null, 
			user: null,
		},
		actions: {
			
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
						throw new Error(errorData.message);
					}

					const data = await response.json();
					return true; 
				} catch (error) {
					console.error("Error al registrar el usuario:", error.message);
					throw error;
				}
			},
			

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
				
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();


				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				
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
						setStore({ token: data.access_token, user: data.user });
						localStorage.setItem("authToken", data.access_token); 
						localStorage.setItem("user", JSON.stringify(data.user)); 
						console.log("Login successful!", data);
						return true; 
					} else {
						console.log("Login failed!");
						return false; 
					}
				} catch (error) {
					console.error("Error logging in", error);
					return false;
				}
			},
			logoutUser: () => {
                localStorage.removeItem("token"); 
                setStore({ token: null }); 
            },

            isAuthenticated: () => {
                return !!getStore().token; 
            }
		}
	};
};

export default getState;
