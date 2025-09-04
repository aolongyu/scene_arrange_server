const resolveModuleFileRemoteHandlers = async (
  toolModuleFileRemoteBaseInfos = []
) => {
  try {
    return [];
  } catch (error) {
    console.error("Error resolving module file remote handlers:", error);
    throw error;
  }
};

module.exports = {
  resolveModuleFileRemoteHandlers,
};
