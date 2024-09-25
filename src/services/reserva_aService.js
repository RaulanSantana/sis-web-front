import fetch from "auth/FetchInterceptor"; // Importa o interceptor de autenticação
import requestCacheService from "./RequestCacheService"; // Importa o serviço de cache

const reservaService = {};

// Obter reservas paginadas
reservaService.get = async function (params = {}) {
	const {
		page = 0,
		pageSize = 5,
		search = "",
		orderBy = "id",
		orderDirection = "asc",
	} = params;

	const queryParams = {
		page,
		pageSize,
		search,
		orderBy,
		orderDirection,
	};

	return fetch({
		url: "/v1/rest/reserva",
		method: "get",
		params: queryParams,
		headers: { is_paginated: true },
	});
};

// Obter todas as reservas
reservaService.getAll = async function () {
	return requestCacheService.cacheRequest(
		"lista_reservas",
		() => {
			return fetch({
				url: "/v1/rest/reserva",
				method: "get",
			});
		},
		300,
	);
};

// Criar uma nova reserva
reservaService.post = async function (values) {
	return fetch({
		url: "/v1/rest/reserva",
		method: "post",
		data: values,
		headers: {
			'Content-Type': 'application/json', // Ou outro tipo dependendo do que você está enviando
		},
	});
};

// Atualizar uma reserva existente
reservaService.put = async function (values, id) {
	return fetch({
		url: `/v1/rest/reserva/${id}`,
		method: "put",
		data: values,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

// Obter reserva por ID
reservaService.getById = async (id) => {
	return fetch({
		url: `/v1/rest/reserva/${id}`,
		method: "get",
	});
};

// Excluir uma reserva
reservaService.delete = async (id) => {
	return fetch({
		url: `/v1/rest/reserva/${id}`,
		method: "delete",
	});
};

export default reservaService;
