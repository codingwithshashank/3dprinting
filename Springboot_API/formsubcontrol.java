package in.formsubapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class formsubcontrol {

    @Autowired
    private DataSource dataSource;

    // Upload File Endpoint
    @PostMapping("/files/upload") //"(/upload)" kiya tha simple html me
    public String uploadFile(@RequestParam("formsub") MultipartFile file) {
        try (Connection connection = dataSource.getConnection()) {
            String query = "INSERT INTO formsub (file_name, file_type, file_data, uploaded_at) VALUES (?, ?, ?, NOW())";
            PreparedStatement statement = connection.prepareStatement(query);

            statement.setString(1, file.getOriginalFilename());
            statement.setString(2, file.getContentType());
            statement.setBytes(3, file.getBytes());
            statement.executeUpdate();

            return "File uploaded successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error uploading file.";
        }
    }
    
    
    @GetMapping("/files")
    public List<Map<String, Object>> getFiles() {
        try (Connection connection = dataSource.getConnection()) {
            String query = "SELECT id, file_name, file_type FROM formsub";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();

            List<Map<String, Object>> files = new ArrayList<>();
            while (resultSet.next()) {
                Map<String, Object> file = new HashMap<>();
                file.put("id", resultSet.getLong("id"));
                file.put("file_name", resultSet.getString("file_name"));
                file.put("file_type", resultSet.getString("file_type"));
                files.add(file);
            }
            return files;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    
    
    

    // Download File Endpoint
    @GetMapping("/files/download/{id}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long id) {
        try (Connection connection = dataSource.getConnection()) {
            String query = "SELECT file_name, file_type, file_data FROM formsub WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setLong(1, id);

            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                String fileName = resultSet.getString("file_name");
                String fileType = resultSet.getString("file_type");
                byte[] fileData = resultSet.getBytes("file_data");

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(org.springframework.http.MediaType.parseMediaType(fileType));
                headers.setContentDispositionFormData("attachment", fileName);

                return new ResponseEntity<>(fileData, headers, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
        
        
     // Delete File Endpoint
        @DeleteMapping("/files/delete/{id}")
        public ResponseEntity<String> deleteFile(@PathVariable Long id) {
            try (Connection connection = dataSource.getConnection()) {
                String query = "DELETE FROM formsub WHERE id = ?";
                PreparedStatement statement = connection.prepareStatement(query);
                statement.setLong(1, id);

                int rowsAffected = statement.executeUpdate();
                if (rowsAffected > 0) {
                    return ResponseEntity.status(HttpStatus.OK).body("File deleted successfully.");
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File not found.");
                }
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting file.");
            }
    }
}
