const resolveMcpToolRemoteHandlers = async (
  toolMcpToolRemoteBaseInfos = []
) => {
  try {
    return [];
  } catch (error) {
    console.error("Error resolving mcp tool remote handlers:", error);
    throw error;
  }
};

module.exports = {
  resolveMcpToolRemoteHandlers,
};
