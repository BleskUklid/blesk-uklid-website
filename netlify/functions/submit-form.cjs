exports.handler = async () => {
  console.log("FUNCTION WORKS");

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, message: "function alive" }),
  };
};
