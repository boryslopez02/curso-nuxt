export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const query = getQuery(event);
  console.log('Received data:', body);

  if (!body.name || !body.price) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and price are required fields',
    });
  }

  return { 
    message: 'Product created successfully', 
    product: {
      name: body.name,
      price: body.price
    },
    query
  };
});
