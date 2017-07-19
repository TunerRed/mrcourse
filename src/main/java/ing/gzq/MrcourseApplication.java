package ing.gzq;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("ing.gzq.dao")
public class MrcourseApplication {

	public static void main(String[] args) {
		SpringApplication.run(MrcourseApplication.class, args);
	}
}
