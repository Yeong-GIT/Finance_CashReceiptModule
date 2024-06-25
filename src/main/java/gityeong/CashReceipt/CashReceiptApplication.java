package gityeong.CashReceipt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"gityeong.CashReceipt", "other.relevant.packages"})
public class CashReceiptApplication {

	public static void main(String[] args) {
		SpringApplication.run(CashReceiptApplication.class, args);
	}

}
