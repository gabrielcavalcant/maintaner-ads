import React from 'react'

export default function Parts() {
  const t = useTranslations();

  const handleEditClick = (id: number) => {
    // Adicione a lógica de edição aqui
  };

  const handleRemoveClick = (id: number) => {
    // Adicione a lógica de remoção aqui
  };

  // Função para gerar dados fictícios
  const generateFakeData = (num: number) => {
    return Array.from({ length: num }, (_, index) => ({
      id: index + 1,
      type: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      maintenance_date: new Date(faker.date.recent()).toLocaleDateString(
        "pt-BR"
      ),
      status: faker.number.int({ min: 0, max: 1 }),
      machine_id: faker.number.int({ min: 0, max: 50 }),
      team_id: faker.number.int({ min: 0, max: 50 }),
      responsible_id: faker.number.int({ min: 0, max: 50 }),
      machine: faker.lorem.words(2),
      team: faker.lorem.word(),
      responsible: faker.person.firstName(),
    }));
  };

  // Gera 50 itens fictícios
  const data = generateFakeData(50);

  // Use o hook com as funções definidas
  const columns: ColumnDef<any>[] = useMaintenanceColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  const { fields, validationSchema } = useCreateMaintenance();

  return (
    <div>
      <Header title={t("Maintenances.title")} />

      <div className="flex w-full items-center justify-end">
        <CreationModal
          onSubmit={(formValues: any) => {
          }}
          fields={fields}
          title={t("Maintenances.createTitle")}
          description={t("Maintenances.createDescription")}
          validationSchema={validationSchema}
        >
          <Button>{t("Maintenances.new")}</Button>
        </CreationModal>
      </div>
      <DataTable
        data={data}
        columns={columns}
        pageCount={0}
        isFetching={false}
        rowCount={data.length}
        maxItems={30}
        height="63vh"
      />
    </div>
  );
}
