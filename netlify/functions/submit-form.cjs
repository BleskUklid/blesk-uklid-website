exports.handler = async (event) => {
  console.log("METHOD:", event.httpMethod);

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, method: "POST" }),
  };
};
