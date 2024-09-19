import React from "react";

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
      name: faker.lorem.words(2),
      code: faker.number.int({ min: 0, max: 4000 }),
      supplier: faker.company.name(),
      base64: faker.image.avatar(),
      stock_quantity: faker.number.int({ min: 0, max: 200 }),
      unit_price: faker.number.float({ min: 9.99, max: 5000 }),
    }));
  };

  // Gera 50 itens fictícios
  const data = generateFakeData(50);

  // Use o hook com as funções definidas
  const columns: ColumnDef<any>[] = usePartColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  const { fields, validationSchema } = useCreatePart();

  return (
    <div>
      <Header title={t("Parts.title")} />
      <div className="flex w-full items-center justify-end">
        <CreationModal
          onSubmit={(formValues) => {
          }}
          fields={fields}
          title={t("Parts.createTitle")}
          description={t("Parts.createDescription")}
          validationSchema={validationSchema}
        >
          <Button>{t("Parts.new")}</Button>
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
