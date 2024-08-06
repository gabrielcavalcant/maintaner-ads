export async function simulatedResponseAPI(data: any): Promise<any> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
}
