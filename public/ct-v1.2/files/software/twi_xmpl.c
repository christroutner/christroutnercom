/*************************************************************************************************************
Project: 	twi_xmple.c
Version: 	1.0
Date: 		09/15/2004
Author: 	Chris Troutner
Company: 	MyRobot                                
Comments: 	This program interfaces with the SRF-08 Sonar Ranging Module via the TWI (I2C) port and protocol.
			This also demonstrates the use of the TWI_MT and TWI_MR function calls.

Robot Type:	MyRobot Mini-Computer
*************************************************************************************************************/
//Compiler Derectives
	
	//Includes
	#include <modelt.h>	
	#include <twi.h>
	
	//Defines
	#define		SRF_08			0xE0
	#define		COMMAND_REG		0x00
	#define		RANGE_INCH		0x50
	#define		RANGE_CM		0x51
	#define		RESULT_REG		0x02
	
//Global Variables
	char t[16];			//Used for sending data to the LCD

//Sub-Function Prototypes
	void ERROR(uint8_t step);

//Main
	int main(void)
	{
	//Local Variables
	uint8_t	temp[2];				//values to start a ranging session
	uint8_t	srf_results[32];		//array that stores the range results

	//Initialization
		reset();			//Reset and all ports and peripherials
		lcd_init();			//Initialize the LCD 
		init_twi();			//Initialize the TWI
		
	//Enable global interrupts (Keep this instruction at the end of initialization).
		asm volatile ("sei");
		
	//Main Exectution Code
		
		//Display something so that we know the LCD is working
//		sprintf(t,"Ready...");
//		line1(t);
//		ms_spin(1000);
		
		while (1) {
			//Write the command start start a ranging session in inches
			temp[0] = COMMAND_REG;
			temp[1] = RANGE_INCH;
			if(TWI_MT(SRF_08, 2, temp))
				ERROR(1);
			
			//Delay 70 mS to wait for ranger to do it's thing before reading the results. Durring this 
			//time the SRF-08 will not respond to TWI protocol.
//			ms_spin(70);
	
			//Retrieve the SRF-08 ranging results
			temp[0] = RESULT_REG;
			if(TWI_MT(SRF_08, 1, temp))		//Tell the SRF-08 which register we want to read
				ERROR(2);
			if(TWI_MR(SRF_08, 4, srf_results))	//Read the first result
				ERROR(3);
		
			//display recieved ranging data on LCD
				//clear LCD
				sprintf(t,"                ");
				line1(t);
				line2(t);
				
				//print output to LCD
				sprintf(t,"1st: %d\"   ", (srf_results[0]*256+srf_results[1]) );
				line1(t);
				sprintf(t,"2nd: %d\"   ", (srf_results[2]*256+srf_results[3]) );
				line2(t);
				
//			ms_spin(5000);
		}
	}
	
	void ERROR(uint8_t step) 
	{
		//clear line 1
		sprintf(t, "              ");
		line1(t);
		line2(t);
		
		//Display the contents of TWSR on line1
		sprintf(t,"TWSR: %X", (TWSR & 0xF8) );
		line1(t);
		sprintf(t,"Error: %d", step);
		line2(t);
		
		//Loop forever
		while (1)
			;
			
	}

