const backendUrl = process.env.REACT_APP_BACKEND_URL;

export async function $fetch(endpoint = null, options = {}, credentials = true, encode = true) {
	if (endpoint == null) {
		return [null, "Endpoint was null"];
	}
	
	try {
		const res = await fetch(`${backendUrl}${options.encode === true ? encodeURI(endpoint) : endpoint}`, {
			...options,
			headers: {
				...options.headers,
				'Authorization': 'JWTBearer',
			},
			credentials: credentials ? 'include' : 'omit'
		});

		return [res, null];
	} catch(error) {
		return [null, error];
	}
}

export async function fjson(endpoint = null, options = {}, credentials = true, encode = true) {
	const { headers } = options;
	const [res, err] = await $fetch(endpoint, {
		...options,
		headers: headers != null ? {
			...headers,
			'Accept': 'application/json'
		} : {
			'Accept': 'application/json'
		},
		credentials,
		encode
	});

	if (err) {
		return [null, err];
	}
	
	try {
		if (res.ok) {
			return [await res.json(), null];
		}

		return [null, await res.json()];
	} catch (exception) {
		return [null, exception];
	}
}
