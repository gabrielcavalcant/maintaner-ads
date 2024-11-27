"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useTeamColumns } from "@/constants/list/useTeamsColumns";
import CreationModal from "@/components/creation/creation-modal";
import { Button } from "@/components/ui/button";
import { useCreateTeam } from "@/constants/creation/useCreateTeam";
import { ApiRequest } from "@/helper/request.module";

export default function Teams() {
  const t = useTranslations();
  const [data, setData] = useState([]); // Armazena os times
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  const API = new ApiRequest(); // Instância da APIRequest

  // Buscar dados da API
  const fetchTeams = async () => {
    setIsLoading(true);
    try {
      const response = await API.ApiRequest("api/Team", { page: 1, pageSize: 10 }); // Ajuste os parâmetros conforme necessário
      console.log(response)
      if (response?.statusCode === 200) {
        setData(response.items || []); // Assumindo que a resposta tem um campo `items`
      } else {
        console.error("Erro ao buscar times:", response);
      }
    } catch (error) {
      console.error("Erro ao buscar times:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega os dados ao montar o componente
  useEffect(() => {
    fetchTeams();
  }, []);

  // Lógica de criação de times
  const handleCreateTeam = async (formValues) => {
    try {
      const response = await API.ApiRequest("/teams/create", formValues);
      if (response?.statusCode === 201) {
        alert("Time criado com sucesso!");
        fetchTeams(); // Atualizar a lista de times
      } else {
        console.error("Erro ao criar time:", response);
        alert("Erro ao criar time. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao criar time:", error);
      alert("Erro ao criar time. Tente novamente.");
    }
  };

  // Lógica de edição de times
  const handleEditClick = async (id: number) => {
    const teamToEdit = data.find((team) => team.id === id);
    if (teamToEdit) {
      try {
        const updatedData = { ...teamToEdit, name: "Novo Nome" }; // Substitua pela lógica do formulário
        const response = await API.ApiRequest(`/teams/update/${id}`, updatedData);
        if (response?.statusCode === 200) {
          alert("Time atualizado com sucesso!");
          fetchTeams(); // Atualizar a lista
        } else {
          console.error("Erro ao editar time:", response);
          alert("Erro ao editar time. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao editar time:", error);
        alert("Erro ao editar time. Tente novamente.");
      }
    }
  };

  // Lógica de remoção de times
  const handleRemoveClick = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este time?")) {
      try {
        const response = await API.ApiRequest(`/teams/delete/${id}`, {});
        if (response?.statusCode === 200) {
          alert("Time excluído com sucesso!");
          fetchTeams(); // Atualizar a lista
        } else {
          console.error("Erro ao excluir time:", response);
          alert("Erro ao excluir time. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao excluir time:", error);
        alert("Erro ao excluir time. Tente novamente.");
      }
    }
  };

  // Use o hook com as funções definidas
  const columns: ColumnDef<any>[] = useTeamColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  const { fields, validationSchema } = useCreateTeam();

  return (
    <div>
      <Header title={t("Teams.title")} />
      <div className="flex w-full items-center justify-end">
        <CreationModal
          onSubmit={handleCreateTeam}
          fields={fields}
          title={t("Team.createTitle")}
          description={t("Team.createDescription")}
          validationSchema={validationSchema}
        >
          <Button>{t("Teams.new")}</Button>
        </CreationModal>
      </div>
      <DataTable
        data={data}
        columns={columns}
        pageCount={Math.ceil(data.length / 10)} // Simulação de paginação
        isFetching={isLoading}
        rowCount={data.length}
        maxItems={30}
        height="63vh"
      />
    </div>
  );
}