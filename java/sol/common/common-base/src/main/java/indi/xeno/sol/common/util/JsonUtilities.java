package indi.xeno.sol.common.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;

public abstract class JsonUtilities {

  private JsonUtilities() {}

  private static final ObjectMapper mapper = init();

  private static ObjectMapper init() {
    ObjectMapper mapper = new ObjectMapper();
    return mapper.findAndRegisterModules();
  }

  public static <T> T read(InputStream is, Class<T> cl) throws IOException {
    return mapper.readValue(is, cl);
  }

  public static <T> T read(InputStream is, TypeReference<T> typeRef) throws IOException {
    return mapper.readValue(is, typeRef);
  }

  public static JsonNode read(InputStream is) throws IOException {
    return mapper.readTree(is);
  }

  public static <T> T read(Reader reader, Class<T> cl) throws IOException {
    return mapper.readValue(reader, cl);
  }

  public static <T> T read(Reader reader, TypeReference<T> typeRef) throws IOException {
    return mapper.readValue(reader, typeRef);
  }

  public static JsonNode read(Reader reader) throws IOException {
    return mapper.readTree(reader);
  }

  public static <T> T read(String str, Class<T> cl) throws JsonProcessingException {
    return mapper.readValue(str, cl);
  }

  public static <T> T read(String str, TypeReference<T> typeRef) throws JsonProcessingException {
    return mapper.readValue(str, typeRef);
  }

  public static JsonNode read(String str) throws JsonProcessingException {
    return mapper.readTree(str);
  }

  public static <T> T read(JsonNode node, Class<T> cl) throws IOException {
    return mapper.readValue(node.traverse(), cl);
  }

  public static <T> T read(JsonNode node, TypeReference<T> typeRef) throws IOException {
    return mapper.readValue(node.traverse(), typeRef);
  }
}
