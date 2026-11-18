import app from "./app.js";
import { port } from "./config/env.js";

app.listen(port, () => {
  console.log(`AtlasAI API listening on port ${port}`);
});
