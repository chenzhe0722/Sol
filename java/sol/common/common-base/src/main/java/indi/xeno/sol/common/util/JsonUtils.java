package indi.xeno.sol.common.util;

import static com.fasterxml.jackson.databind.json.JsonMapper.builder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;

public abstract class JsonUtils {

  private JsonUtils() {}

  private static final ObjectMapper MAPPER = builder().build().findAndRegisterModules();

  public static <T> T readJson(InputStream is, Class<T> cls) throws IOException {
    return MAPPER.readValue(is, cls);
  }

  public static <T> T readJson(InputStream is, TypeReference<T> typeRef) throws IOException {
    return MAPPER.readValue(is, typeRef);
  }

  public static JsonNode readJson(InputStream is) throws IOException {
    return MAPPER.readTree(is);
  }

  public static <T> T readJson(Reader reader, Class<T> cls) throws IOException {
    return MAPPER.readValue(reader, cls);
  }

  public static <T> T readJson(Reader reader, TypeReference<T> typeRef) throws IOException {
    return MAPPER.readValue(reader, typeRef);
  }

  public static JsonNode readJson(Reader reader) throws IOException {
    return MAPPER.readTree(reader);
  }

  public static <T> T readJson(File file, Class<T> cls) throws IOException {
    return MAPPER.readValue(file, cls);
  }

  public static <T> T readJson(File file, TypeReference<T> typeRef) throws IOException {
    return MAPPER.readValue(file, typeRef);
  }

  public static JsonNode readJson(File file) throws IOException {
    return MAPPER.readTree(file);
  }

  public static <T> T readJson(String str, Class<T> cls) throws JsonProcessingException {
    return MAPPER.readValue(str, cls);
  }

  public static <T> T readJson(String str, TypeReference<T> typeRef)
      throws JsonProcessingException {
    return MAPPER.readValue(str, typeRef);
  }

  public static JsonNode readJson(String str) throws JsonProcessingException {
    return MAPPER.readTree(str);
  }

  public static <T> T readJson(JsonNode node, Class<T> cls) throws IOException {
    return MAPPER.readValue(node.traverse(), cls);
  }

  public static <T> T readJson(JsonNode node, TypeReference<T> typeRef) throws IOException {
    return MAPPER.readValue(node.traverse(), typeRef);
  }
}
