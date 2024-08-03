export async function simulatedResponseAPI(
  data: any
): Promise<Record<string, any>> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
}
